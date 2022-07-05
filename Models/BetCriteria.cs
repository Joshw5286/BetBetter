using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetBetter.Models
{
    public class BetCriteria
    {
        public int Id { get; set; }
        public int BetId{ get; set; }
        public string Criteria { get; set; }
        public int SportTypeId { get; set; }
        public decimal Odds { get; set; }
        public bool Win { get; set; }
    }
}