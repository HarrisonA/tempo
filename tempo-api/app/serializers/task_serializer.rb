class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :description
  has_one :user
  has_one :project
end
