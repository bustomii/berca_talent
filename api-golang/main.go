package main

import (
	"log"
	"net/http"
	"api-golang/router"
	"github.com/sirupsen/logrus"
)

func main() {
	r := router.SetupRouter()

	logrus.Info("Starting server on http://localhost:1010")
	if err := http.ListenAndServe(":1010", r); err != nil {
		log.Fatal(err)
	}
}