using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class po2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LineStatus",
                table: "PurchaseOrderLines",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "ReceivedQuantity",
                table: "PurchaseOrderLines",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LineStatus",
                table: "PurchaseOrderLines");

            migrationBuilder.DropColumn(
                name: "ReceivedQuantity",
                table: "PurchaseOrderLines");
        }
    }
}
