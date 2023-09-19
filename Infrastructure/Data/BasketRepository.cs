using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;
using System.Text.Json;

namespace Infrastructure.Data;
public class BasketRepository : IBasketRepository
{
    private readonly IDatabase database;

    public BasketRepository(IConnectionMultiplexer redis)
    {
        this.database = redis.GetDatabase();
    }
    public async Task<bool> DeleteBasketAsync(string basketId)
    {
        return await database.KeyDeleteAsync(basketId);
    }

    public async Task<CustomerBasket?> GetBasketAsync(string basketId)
    {
        var data = await database.StringGetAsync(basketId);

        return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);
    }

    public async Task<CustomerBasket?> UpdateBasketAsync(CustomerBasket customerBasket)
    {
        var created = await database.StringSetAsync(customerBasket.Id, JsonSerializer.Serialize(customerBasket), TimeSpan.FromDays(30));

        if (!created) return null;

        return await GetBasketAsync(customerBasket.Id);
    }
}
