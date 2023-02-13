using Microsoft.EntityFrameworkCore;
using hark_ett.Models;

namespace hark_ett.Data
{
    public class MyDBContext : DbContext
    {
        public MyDBContext(DbContextOptions<MyDBContext> options) : base(options) { }
        public DbSet<EnergyRecord> EnergyRecords { get; set; }
    }
}
