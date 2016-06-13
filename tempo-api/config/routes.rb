Rails.application.routes.draw do

  resources :sessions, only: [:create]
  resources :users, except: [:new, :edit]
  # get '/login', to: 'sessions#new'
  # post '/login', to: 'sessions#create'
  # get '/logout', to: 'sessions#destroy'
  # get '/signup', to: 'users#new'
end
