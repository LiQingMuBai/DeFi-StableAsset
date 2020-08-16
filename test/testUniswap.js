const UniswapSwapModel = artifacts.require("UniswapSwapModel");
const WETH = artifacts.require("WETH9");
const UniswapV2Factory = artifacts.require("UniswapV2Factory");
const UniswapV2Pair = artifacts.require("UniswapV2Pair");
const UniswapV2Router02 = artifacts.require("UniswapV2Router02");


const truffleAssert = require("truffle-assertions");
async function setupUniswapWaffle() {
    const [owner] = waffle.provider.getWallets();

    // Deploy Uniswap contracts and create pairs
    uniswap_factory = await deployContract(owner, UniswapV2Factory);
    await uniswap_factory.deployed();
    await uniswap_factory.createPair(COMP.address, USDC.address);
    let pair = await uniswap_factory.getPair(COMP.address, USDC.address);

    uniswap_pair = await ethers.getContractAt(UniswapV2Pair.abi, pair);
    weth = await deployContract(owner, WETH);
    await weth.deployed();

    uniswap_router = await deployContract(
      owner,
      UniswapV2Router02[(uniswap_factory.address, weth.address)]
    );
    await uniswap_router.deployed();
  }

  async function setupUniswap() {
    uniswap_factory = await UniswapV2Factory.new(owner);
    weth = await WETH.new();

    let pair;
    // COMP Pair
    await uniswap_factory.createPair(COMP.address, weth.address);
    //pair = await uniswap_factory.getPair(COMP.address, WETH.address);
    //uniswap_pair = await UniswapV2Pair.at(pair);

    // USDC Pair
    await uniswap_factory.createPair(USDC.address, weth.address);
    //pair = await uniswap_factory.getPair(USDC.address, WETH.address);
    //uniswap_pair = await UniswapV2Pair.at(pair);

    // Use the last account to deploy router to get a fixed address
    let accounts = await web3.eth.getAccounts();
    let account = accounts[accounts.length - 1];
    uniswap_router = await UniswapV2Router02.new(
      uniswap_factory.address,
      weth.address,
      {from: account}
    );
  }

  async function setupUniswapAndSwapModel() {
    await setupUniswap();
    //await setupUniswapWaffle();

    console.log("\tROUTER:\t", uniswap_router.address);
    console.log("\tCOMP:\t", COMP.address);
    console.log("\tUSDC:\t", USDC.address);
    //console.log("\tTOKEN0:\t", await uniswap_pair.token0());

    await COMP.approve(uniswap_router.address, UINT256_MAX, {
      from: account1,
    });
    await USDC.approve(uniswap_router.address, UINT256_MAX, {
      from: account1,
    });

    // Setting up the ratio to COMP:USDC to 1:150
    await uniswap_router.addLiquidityETH(
      COMP.address,
      expandTo18Decimals(1000),
      expandTo18Decimals(1000),
      expandTo18Decimals(1),
      account1,
      UINT256_MAX,
      {from: account1, value: expandTo18Decimals(1)}
    );

    await uniswap_router.addLiquidityETH(
      USDC.address,
      150000e6,
      150000e6,
      expandTo18Decimals(1),
      account1,
      UINT256_MAX,
      {from: account1, value: expandTo18Decimals(1)}
    );

    let swap_amount = expandTo18Decimals(1);
    await COMP.approve(uniswap_router.address, UINT256_MAX, {
      from: account2,
    });

    let comp_before = await COMP.balanceOf(account2);
    let usdc_before = await USDC.balanceOf(account2);
    await uniswap_router.swapExactTokensForTokens(
      swap_amount,
      0,
      [COMP.address, weth.address, USDC.address],
      account2,
      UINT256_MAX,
      {from: account2}
    );
    let comp_after = await COMP.balanceOf(account2);
    let usdc_after = await USDC.balanceOf(account2);

    console.log(
      "\tSwapped ",
      comp_before
        .sub(comp_after)
        .div(new BN(10).pow(new BN(18)))
        .toString(),
      " COMP for ",
      usdc_after.sub(usdc_before).div(new BN(1e6)).toString(),
      " USDC"
    );

    // Reward Swap Model
    swap_model = await UniswapSwapModel.new();
  }

  before(async function () {
    [
      owner,
      account1,
      account2,
      account3,
      account4,
    ] = await web3.eth.getAccounts();

    await setupDToken();
  });

  it("Should claim some COMP", async function () {
    dUSDC.mint(account1, 1000e6, {from: account1});

    let comp_airdrop = expandTo18Decimals(10);
    await COMP.allocateTo(compound_handler.address, comp_airdrop);
    //console.log((await COMP.balanceOf(compound_handler.address)).toString());

    // mint again to claim comp
    await dUSDC.mint(account1, 10e6, {from: account1});

    let comp_claimed = await COMP.balanceOf(dUSDC.address);

    assert.equal(comp_airdrop.toString(), comp_claimed.toString());
  });

  it("Should deploy UniswapSwapModel", async function () {
    await setupUniswapAndSwapModel();
  });

  it("Should failed when no swap model was set", async function () {
    await truffleAssert.reverts(
      dUSDC.swap(COMP.address, expandTo18Decimals(1)),
      "swap: no swap model available!"
    );
  });

  it("Should set the Swap Model", async function () {
    await dUSDC.setSwapModel(swap_model.address);
    assert.equal((await dUSDC.swapModel()).toString(), swap_model.address);
  });

  it("Can swap some COMP into underlying tokens and put them into internal handler (Skipped in coverage)", async function () {
    let exchange_rate_before = await dUSDC.getExchangeRate();
    let total_before = await dUSDC.getTotalBalance();

    let comp_balance = await COMP.balanceOf(dUSDC.address);
    let tx = await dUSDC.swap(COMP.address, comp_balance);

    let exchange_rate_after = await dUSDC.getExchangeRate();
    let total_after = await dUSDC.getTotalBalance();

    let swapped;
    truffleAssert.eventEmitted(tx, "Swap", (ev) => {
      swapped = ev.amountOut;

      console.log(
        "\tSwapped ",
        ev.amountIn.div(new BN(10).pow(new BN(18))).toString(),
        " COMP for ",
        ev.amountOut.div(new BN(1e6)).toString(),
        " USDC"
      );
      return true;
    });

    console.log(
      "\tExchange Rate: \t",
      exchange_rate_before.toString(),
      " to ",
      exchange_rate_after.toString()
    );

    console.log(
      "\tTotal Underlying Balance: \t",
      total_before.toString(),
      " to ",
      total_after.toString()
    );

    assert.equal(total_before.add(swapped).toString(), total_after.toString());
  });
});