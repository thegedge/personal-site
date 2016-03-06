variable "azs" {
  default = "b,c,d,e"
  description = "Availability zones to use for subnets"
}

resource "aws_subnet" "public" {
  count = 4
  vpc_id = "${aws_vpc.main.id}"
  cidr_block = "${cidrsubnet(aws_vpc.main.cidr_block, 2, count.index)}"
  map_public_ip_on_launch = true
  availability_zone = "us-east-1${element(split(",", var.azs), count.index)}"

  tags {
    Name = "Public"
  }
}

resource "aws_route_table" "public" {
  vpc_id = "${aws_vpc.main.id}"
}

resource "aws_route" "internet" {
  route_table_id = "${aws_route_table.public.id}"
  destination_cidr_block = "0.0.0.0/0"
  gateway_id = "${aws_internet_gateway.gw.id}"
}

resource "aws_route_table_association" "public" {
  count = 4
  subnet_id = "${element(aws_subnet.public.*.id, count.index)}"
  route_table_id = "${aws_route_table.public.id}"
}
