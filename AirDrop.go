
package main

import (
	"context"
	"crypto/ecdsa"
	"math/big"
	"strconv"
	"time"

	"flag"
	"fmt"
	"github.com/360EntSecGroup-Skylar/excelize"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"golang.org/x/crypto/sha3"
	"log"
)

func main() {

	airdropPath := flag.String("path", "AIR.xlsx", "空投地址表格路径")
	privateKey := flag.String("privateKey", "", "私钥key内容")
	amount := flag.String("amount", "500000000", "投放量")
	contract := flag.String("contract", "", "合约地址")
	//duration := flag.Int("duration", 1, "间隔秒")
	flag.Parse()

	f, err := excelize.OpenFile(*airdropPath)
	if err != nil {
		fmt.Println(err)
		return
	}
	// Get all the rows in the Sheet1.
	rows, err := f.GetRows("in")
	for _, row := range rows {
		for _, colCell := range row {
			//fmt.Print(colCell, "\t")
			errmsg := sendToken(*privateKey, colCell, *amount, *contract)
			if errmsg != nil {
				log.Println("发送错误")
			}

			time.Sleep(30000 * time.Millisecond)
		}
		fmt.Println()
	}

}

func sendToken(privateKey, destinyAddress, amountValue, contract string) (err error) {
	log.Println("=============空投地址==================")
	log.Println(destinyAddress)
	transferAmount, _ := strconv.ParseFloat(amountValue, 32/64)
	log.Println(transferAmount / 1000000000)
	log.Println("======================================")
	client, err := ethclient.Dial("") //support etherscan infura
	if err != nil {
		log.Fatal(err)
	}
	//log.Println(client)
	priKey, err := crypto.HexToECDSA(privateKey)
	if err != nil {
		log.Fatal(err)
	}
	//log.Println("privatekey", priKey)
	//
	publicKey := priKey.Public()
	publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
	if !ok {
		log.Fatal("error casting public key to ECDSA")
	}
	//log.Println("publicKeyECDSA  ", publicKeyECDSA)
	fromAddress := crypto.PubkeyToAddress(*publicKeyECDSA)
	nonce, err := client.PendingNonceAt(context.Background(), fromAddress)
	if err != nil {
		log.Fatal(err)
	}
	//log.Println("fromaddress ", fromAddress)
	//log.Println("nonce", nonce)
	//
	value := big.NewInt(0) // in wei (0 eth)
	gasPrice, err := client.SuggestGasPrice(context.Background())
	if err != nil {
		log.Fatal(err)
	}

	toAddress := common.HexToAddress(destinyAddress)
	tokenAddress := common.HexToAddress(contract)

	transferFnSignature := []byte("transfer(address,uint256)")
	hash := sha3.NewLegacyKeccak256()

	hash.Write(transferFnSignature)
	methodID := hash.Sum(nil)[:4]
	//fmt.Printf("Method ID: %s\n", hexutil.Encode(methodID))

	paddedAddress := common.LeftPadBytes(toAddress.Bytes(), 32)
	//fmt.Printf("To address: %s\n", hexutil.Encode(paddedAddress))
	//
	amount := new(big.Int)
	amount.SetString(amountValue, 10) // 0.5 tokens
	paddedAmount := common.LeftPadBytes(amount.Bytes(), 32)
	//fmt.Printf("Token amount: %s", hexutil.Encode(paddedAmount))

	var data []byte
	data = append(data, methodID...)
	data = append(data, paddedAddress...)
	data = append(data, paddedAmount...)
	//
	gasLimit, err := client.EstimateGas(context.Background(), ethereum.CallMsg{
		To:   &toAddress,
		Data: data,
	})
	if err != nil {
		log.Fatal(err)
	}
	//fmt.Printf("Gas limit: %d", gasLimit)
	tx := types.NewTransaction(nonce, tokenAddress, value, gasLimit*5, gasPrice, data)
	signedTx, err := types.SignTx(tx, types.HomesteadSigner{}, priKey)
	if err != nil {
		log.Fatal(err)
	}
	err = client.SendTransaction(context.Background(), signedTx)
	if err != nil {
		log.Fatal(err)
	}
	//fmt.Printf("Tokens sent at TX: %s", signedTx.Hash().Hex())
	return err
}
