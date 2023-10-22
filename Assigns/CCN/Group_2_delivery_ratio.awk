BEGIN{
recieve=0
drop=0
total=0
ratio=0
}




{
if($1=="r" && $4==6)
{
recieve++
}
if($1=="d" && $4==6)
{
drop++
}
}



END{
total=recieve+drop
ratio=(recieve/total)

printf( "\nThe total number of packets recieved is: %d\n ", recieve)
printf( "\nThe total number of the packets is: %d\n ", total)
printf( "\nThe ratio of the packets recieved is: %f\n ", ratio)
}
