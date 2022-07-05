using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetBetter.Models
{
    public class Bet
    {
        public int Id { get; set; }
        public string ClientId { get; set; }
        public int BetTypeId { get; set; }
        public decimal Stake { get; set; }
        public int Winnings { get; set; }
        public bool Cashout { get; set; }
    }
}