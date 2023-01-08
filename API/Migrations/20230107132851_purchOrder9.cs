using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class purchOrder9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                    name: "ReceivedStatus",
                    table: "PurchaseOrders");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
