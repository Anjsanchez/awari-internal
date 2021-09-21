using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedAmountsIntables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "grossAmount",
                table: "TransLines",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "netAmount",
                table: "TransLines",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "grossAmount",
                table: "TransLines");

            migrationBuilder.DropColumn(
                name: "netAmount",
                table: "TransLines");
        }
    }
}
