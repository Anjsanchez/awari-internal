using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class purchOrder6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropColumn(
            //    name: "ReceivedStatus",
            //    table: "PurchaseOrders");

            //migrationBuilder.DropColumn(
            //    name: "ReceivedStatusDescription",
            //    table: "PurchaseOrders");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReceivedStatus",
                table: "PurchaseOrders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ReceivedStatusDescription",
                table: "PurchaseOrders",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
