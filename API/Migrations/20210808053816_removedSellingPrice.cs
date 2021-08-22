using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class removedSellingPrice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "sellingPrice",
                table: "Rooms");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "sellingPrice",
                table: "Rooms",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
