#!/usr/bin/env perl

use strict;
use warnings;
use utf8;
use Carp;
use 5.020;
use IO::File;
use AnyEvent::RaspberryPi::GPIO;
use AnyEvent;

main();

sub main {
  my $cv     = AE::cv;
  my $gpio17 = AnyEvent::RaspberryPi::GPIO->new({
    channel   => 17,
    direction => "out",
    verbose   => 1,
    onchange  => sub {

    }
  });

  my $gpio4 = AnyEvent::RaspberryPi::GPIO->new({
      channel   => 4,
      direction => "in",
      verbose   => 1,
      onchange  => sub {
        my $value = shift;
        $gpio17->set($value);
      }
    });

  $cv->begin;
  my $finalize = AE::signal "INT", sub {
    $cv->end;
  };

  $cv->recv;
  #$gpio4->unexport();
  #$gpio17->unexport();
  say "\nBye!!";
}

