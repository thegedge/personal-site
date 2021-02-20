provider "aws" {
  region = "us-east-1"
}

resource "aws_key_pair" "deploy" {
  key_name = "test-deploy-user"
  public_key = "${file(var.deploy_key_path)}"
}

resource "aws_security_group" "allow_http" {
  name = "allow_all_elb_http"
  description = "Allow all inbound traffic"
  vpc_id = "${aws_vpc.main.id}"

  ingress {
      from_port = 80
      to_port = 80
      protocol = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
      from_port = 443
      to_port = 443
      protocol = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_elb" "www" {
  name = "www"

  listener {
    instance_port = 80
    instance_protocol = "http"
    lb_port = 80
    lb_protocol = "http"
  }

  health_check {
    healthy_threshold = 2
    unhealthy_threshold = 2
    timeout = 3
    target = "HTTP:80/"
    interval = 30
  }

  subnets = ["${aws_subnet.public.*.id}"]
  instances = ["${aws_instance.www.*.id}"]
  cross_zone_load_balancing = true
  idle_timeout = 400
  connection_draining = true
  connection_draining_timeout = 400
  security_groups = [
    "${aws_vpc.main.default_security_group_id}",
    "${aws_security_group.allow_http.id}",
  ]

  tags {
    Name = "www"
  }
}
