using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedColumnIsActivityType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isActivityType",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isActivityType",
                table: "Products");
        }
    }
}
