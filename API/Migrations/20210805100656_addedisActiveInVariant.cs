using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedisActiveInVariant : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte>(
                name: "isActive",
                table: "RoomVariants",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isActive",
                table: "RoomVariants");
        }
    }
}
