package router

import (
	"github.com/gorilla/mux"
	"api-golang/handlers"
)

func SetupRouter() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/stocks", handlers.CreateStock).Methods("POST")
	r.HandleFunc("/stocks", handlers.ListStock).Methods("GET")
	r.HandleFunc("/stocks/{id}", handlers.DetailStock).Methods("GET")
	r.HandleFunc("/stocks/{id}", handlers.UpdateStock).Methods("PUT")
	r.HandleFunc("/stocks/{id}", handlers.DeleteStock).Methods("DELETE")
	return r
}
