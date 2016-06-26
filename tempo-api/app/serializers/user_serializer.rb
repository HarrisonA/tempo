class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email
  has_many :projects
  has_many :tasks
end
