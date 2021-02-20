resource "aws_security_group_rule" "allow_all_ssh" {
  security_group_id = "${aws_vpc.main.default_security_group_id}"
  type = "ingress"
  from_port = 22
  to_port = 22
  protocol = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_instance" "www" {
  count = "${var.num_instances}"
  ami = "${var.ami}"
  instance_type = "${var.instance_type}"
  subnet_id = "${element(aws_subnet.public.*.id, count.index)}"
  key_name = "${aws_key_pair.deploy.key_name}"
  user_data = "${file(concat(path.module, "/user_data.sh"))}"

  tags {
    Name = "web-server-${count.index}"
  }
}

resource "template_file" "local_www_path" {
  template = "$${path}"
  vars {
    path = "${replace(trimspace(var.local_www_path), "/\\/$/", "")}"
  }
}

resource "null_resource" "deploy" {
  count = "${var.num_instances}"

  connection {
    user = "ec2-user"
    host = "${element(aws_instance.www.*.public_ip, count.index)}"
    agent = true
  }

  provisioner "remote-exec" {
    inline = [
      "rm -rf ~/html && mkdir ~/html",
    ]
  }

  # Note the trailing slash (rsync semantics for transfer)
  provisioner "file" {
    source = "${template_file.local_www_path.rendered}/"
    destination = "/home/ec2-user/html"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo mv /home/ec2-user/html/* /usr/share/nginx/html",
      "sudo service nginx reload",
    ]
  }
}
