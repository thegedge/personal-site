variable "ami" {
  default = "ami-8fcee4e5"
}

variable "num_instances" {
  default = 2
}

variable "instance_type" {
  default = "t2.micro"
}

variable "deploy_key_path" {
  description = "path to the local file containing the SSH key used to deploy"
  default = "~/.ssh/id_rsa.pub"
}

variable "local_www_path" {
  description = "path to the local directory containing your website"
}
