using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class purchOrder11 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "PurchaseOrderLines",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Note",
                table: "PurchaseOrderLines");
        }
    }
}
