using BetBetter.Models;
using System.Collections.Generic;
using System.Web.Mvc;

namespace BetBetter.Controllers
{
    public class BetsController : Controller
    {
        // GET: Bets
        public ActionResult Index()
        {
            var bets = GetAllBets();

            return View(bets);
        }

        public ActionResult AccumulatorTracker()
        {
            return View();
        }

        public ActionResult Details(int id)
        {
            List<BetCriteria> betCriteria = GetBetCriteria(id);

            return View(betCriteria);
        }

        public List<Bet> GetAllBets()
        {
            List<Bet> bets = new List<Bet>();

            bets.Add(new Bet
            {
                Id = 492,
                ClientId = "O/8986107/0000492",
                BetTypeId = 6,
                Stake = 7,
                Winnings = 0,
                Cashout = false
            });

            bets.Add(new Bet
            {
                Id = 492,
                ClientId = "O/8986107/0000492",
                BetTypeId = 6,
                Stake = 7,
                Winnings = 0,
                Cashout = false
            });

            return bets;
        }

        public List<BetCriteria> GetBetCriteria(int betId)
        {
            List<BetCriteria> betCriteria = new List<BetCriteria>();

            betCriteria.Add(new BetCriteria
            {
                Id = 1,
                BetId = 492,
                Criteria = "Dricus Du Plessis by KO/TKO",
                SportTypeId = 2,
                Odds = 3.0m,
                Win = false
            });

            betCriteria.Add(new BetCriteria
            {
                Id = 2,
                BetId = 492,
                Criteria = "Uriah Hall by KO/TKO",
                SportTypeId = 2,
                Odds = 4.5m,
                Win = false
            });

            betCriteria.Add(new BetCriteria
            {
                Id = 3,
                BetId = 492,
                Criteria = "Pedro Munhoz",
                SportTypeId = 2,
                Odds = 3.25m,
                Win = false
            });

            return betCriteria;
        }
    }

}