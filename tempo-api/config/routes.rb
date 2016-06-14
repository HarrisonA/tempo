Rails.application.routes.draw do

  resources :sessions, only: [:create]
  resources :users, except: [:new, :edit]

end
