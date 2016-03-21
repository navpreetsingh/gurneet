Rails.application.routes.draw do
  get "home" => 'static#home'

  get "portfolio" => 'static#portfolio'

  get "services" => 'static#services'

  get "about_us" => 'static#about_us'

  get 'static/insights'

  get "contact" => 'static#contact'

  root :to => 'static#home'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'
end
