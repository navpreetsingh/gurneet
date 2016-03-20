require 'test_helper'

class StaticControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get static_home_url
    assert_response :success
  end

  test "should get portfolio" do
    get static_portfolio_url
    assert_response :success
  end

  test "should get services" do
    get static_services_url
    assert_response :success
  end

  test "should get about_us" do
    get static_about_us_url
    assert_response :success
  end

  test "should get insights" do
    get static_insights_url
    assert_response :success
  end

  test "should get get_in_touch" do
    get static_get_in_touch_url
    assert_response :success
  end

end
