package db

import (
	"fmt"
	"log"
	"os"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"api-golang/models"
)

var DB *gorm.DB

func init() {
	dsn := "host=localhost user=postgres password=12345678 dbname=golang port=5333 sslmode=disable TimeZone=Asia/Jakarta"
	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	if err := DB.AutoMigrate(&models.Stock{}); err != nil {
		fmt.Println("Error migrating database:", err)
		os.Exit(1)
	}
}
