using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class purchOrder8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RcvStatus",
                table: "PurchaseOrders",
                newName: "RcvStatusX");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RcvStatusX",
                table: "PurchaseOrders",
                newName: "RcvStatus");

            migrationBuilder.DropColumn(
                    name: "ReceivedStatus",
                    table: "PurchaseOrders");
        }
    }
}
