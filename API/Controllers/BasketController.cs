using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository basketRepository;

        public BasketController(IBasketRepository basketRepository)
        {
            this.basketRepository = basketRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetBasketById(string id)
        {
            var basket = await basketRepository.GetBasketAsync(id);

            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<IActionResult> UpdateBasketAsync(CustomerBasket customerBasket)
        { 
            var updatedBasket = await basketRepository.UpdateBasketAsync(customerBasket);

            return Ok(updatedBasket);
        }

        [HttpDelete]
        public async Task DeleteBasketAsync(string id) 
        { 
            await basketRepository.DeleteBasketAsync(id);
        }
    }
}
