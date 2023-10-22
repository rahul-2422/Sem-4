set ns [new Simulator]

set nr [open rip.tr w]
$ns trace-all $nr

set nf [open rip.nam w]
$ns namtrace-all $nf

proc finish {} {

	global ns nr nf
		$ns flush-trace
		close $nf
	close $nr
	exec nam rip.nam &
	exec awk -f rip_throughput.awk rip.tr &
	exec awk -f rip_delivery_ratio.awk rip.tr &
	exec awk -f rip_end_delay.awk rip.tr &
	exit 0
	
}

for { set i 0 } {$i < 11} {incr i 1} {
	set n($i) [$ns node]
}

$n(0) shape box
$n(0) label "Source 1"

$n(3) shape box
$n(3) label "Source 2"

$n(6) shape box
$n(6) label "Destination"


for {set i 0} {$i < 9} {incr i 1} {
	$ns duplex-link $n($i) $n([expr $i+1]) 1Mb 10ms DropTail
}
$ns duplex-link $n(0) $n(8) 1Mb 10ms DropTail
$ns duplex-link $n(1) $n(10) 1Mb 10ms DropTail

$ns duplex-link $n(10) $n(9) 1Mb 10ms DropTail
$ns duplex-link $n(9) $n(3) 1Mb 10ms DropTail
$ns duplex-link $n(9) $n(6) 1Mb 10ms DropTail


set udp0 [new Agent/UDP]
$ns attach-agent $n(0) $udp0

set cbr0 [new Application/Traffic/CBR]
$cbr0 set packetSize_ 500
$cbr0 set interval_ 0.005
$cbr0 attach-agent $udp0

set null0 [new Agent/Null]
$ns attach-agent $n(6) $null0

$ns connect $udp0 $null0

set udp1 [new Agent/UDP]
$ns attach-agent $n(3) $udp1

set cbr1 [new Application/Traffic/CBR]
$cbr1 set packetSize_ 500
$cbr1 set interval_ 0.005
$cbr1 attach-agent $udp1

$ns connect $udp1 $null0

$ns rtproto DV

$ns rtmodel-at 5.0 down $n(8) $n(7)
$ns rtmodel-at 10.0 down $n(3) $n(9)
$ns rtmodel-at 20.0 up $n(3) $n(9)
$ns rtmodel-at 15.0 up $n(8) $n(7)

$udp0 set fid_ 1
$udp1 set fid_ 2

$ns color 1 Blue
$ns color 2 Black

$ns at 1.0 "$cbr0 start"
$ns at 2.0 "$cbr1 start"
$ns at 22 "finish"

$ns run
