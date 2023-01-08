using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class purchOrder1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RequestStatus",
                table: "PurchaseOrders",
                newName: "ReceivedStatus");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ReceivedStatus",
                table: "PurchaseOrders",
                newName: "RequestStatus");
        }
    }
}
