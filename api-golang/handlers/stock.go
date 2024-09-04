package handlers

import (
	"encoding/json"
	"net/http"
	"time"
	"github.com/gorilla/mux"
	"api-golang/models"
	"api-golang/db"
	"github.com/sirupsen/logrus"
	"os"
)

func CreateStock(w http.ResponseWriter, r *http.Request) {
	var stock models.Stock
	if err := json.NewDecoder(r.Body).Decode(&stock); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	stock.CreatedAt = time.Now()
	stock.UpdatedAt = time.Now()

	if err := db.DB.Create(&stock).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stock)
	logRequestResponse(r, stock)
}

func ListStock(w http.ResponseWriter, r *http.Request) {
	var stocks []models.Stock
	if err := db.DB.Find(&stocks).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stocks)
	logRequestResponse(r, stocks)
}

func DetailStock(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var stock models.Stock
	if err := db.DB.First(&stock, id).Error; err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stock)
	logRequestResponse(r, stock)
}

func UpdateStock(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var stock models.Stock
	if err := db.DB.First(&stock, id).Error; err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&stock); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	stock.UpdatedAt = time.Now()

	if err := db.DB.Save(&stock).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stock)
	logRequestResponse(r, stock)
}

func DeleteStock(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	if err := db.DB.Delete(&models.Stock{}, id).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
	logRequestResponse(r, nil)
}

func logRequestResponse(r *http.Request, response interface{}) {
	logrus.WithFields(logrus.Fields{
		"request":  r.RequestURI,
		"response": response,
	}).Info("Request Response")	

	f, err := os.OpenFile("go.log", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0755)

	if err != nil {
		logrus.Fatal(err)
	}

	logrus.SetOutput(f)
}
