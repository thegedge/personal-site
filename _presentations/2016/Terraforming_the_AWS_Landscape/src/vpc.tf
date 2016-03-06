resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/24"
  tags {
    Name = "testing"
  }
}

resource "aws_internet_gateway" "gw" {
  vpc_id = "${aws_vpc.main.id}"
}
