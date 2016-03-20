Rails.application.routes.draw do
  get "home" => 'static#home'

  get "portfolio" => 'static#portfolio'

  get 'static/services'

  get 'static/about_us'

  get 'static/insights'

  get 'static/get_in_touch'

  root :to => 'static#home'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'
end
