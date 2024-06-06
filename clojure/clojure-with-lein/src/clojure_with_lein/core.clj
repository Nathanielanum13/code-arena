(ns clojure-with-lein.core
  (:require [io.pedestal.http :as http]
            [io.pedestal.http.route :as route])
  (:gen-class))


(defn home-view [request]
  (let [user-info (get-in request [:query-params])]
    (println "What is your name please do" user-info)
    {:status 200, :body (str "Welcome to my " user-info "\n")}))


(def routes
  (route/expand-routes
   #{["/" :get home-view :route-name :home]}))

(defn create-server [port]
  (println "Server running on port" port)
  (http/create-server
   {::http/routes routes
    ::http/type :jetty
    ::http/port port}))

(defn -main
  [& _]
  (println "Http server running on port: 8898")
  (http/start (create-server 8898)))
