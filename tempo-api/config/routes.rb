Rails.application.routes.draw do

  resources :projects, except: [:new, :edit]
  resources :sessions, only: [:create]
  resources :users, except: [:new, :edit]

end
