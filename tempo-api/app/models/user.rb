require 'securerandom'

class User < ActiveRecord::Base
  has_secure_password
  before_save :set_auth_token

  has_and_belongs_to_many :projects
  has_many :tasks

  private

  def set_auth_token
    return if auth_token.present?
    self.auth_token = generate_auth_token
  end

  def generate_auth_token
    SecureRandom.uuid.gsub(/\-/, '')
  end
end
