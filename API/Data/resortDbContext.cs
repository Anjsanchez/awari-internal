using API.Models;
using API.Models.functionality;
using API.Models.products;
using API.Models.reservation;
using API.Models.rooms;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class resortDbContext : DbContext
    {
        public resortDbContext(DbContextOptions<resortDbContext> opt) : base(opt)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<RoomVariant> RoomVariants { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<RoomPricing> RoomPricings { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<ReservationType> ReservationTypes { get; set; }
        public DbSet<ReservationHeader> ReservationHeaders { get; set; }
        public DbSet<ReservationPayment> ReservationPayments { get; set; }
        public DbSet<ReservationRoomLine> ReservationRoomLines { get; set; }
    }
}