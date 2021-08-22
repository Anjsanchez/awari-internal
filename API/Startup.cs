using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Contracts;
using API.Contracts.pages;
using API.Contracts.pages.functionality;
using API.Contracts.pages.products;
using API.Contracts.pages.reservation;
using API.Contracts.pages.rooms;
using API.Data;
using API.Data.Profiles;
using API.Migrations.Configurations;
using API.Repository;
using API.Repository.pages;
using API.Repository.pages.functionality;
using API.Repository.pages.products;
using API.Repository.pages.reservation;
using API.Repository.pages.rooms;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;

namespace API
{
    public class Startup
    {
        public IConfiguration _config { get; }
        public Startup(IConfiguration config)
        {
            _config = config;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<jwtConfig>(_config.GetSection("JwtConfig"));

            services.AddDbContext<resortDbContext>(opt => opt.UseSqlServer
                (_config.GetConnectionString("resortConnection")));

            services.AddControllers().AddNewtonsoftJson(s =>
            {
                s.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });

            services.AddAuthentication(options =>
           {
               options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
               options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
               options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

           }).AddJwtBearer(jwt =>
           {
               var key = Encoding.ASCII.GetBytes(_config["JwtConfig:Secret"]);

               jwt.SaveToken = true;
               jwt.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
               {
                   ValidateIssuerSigningKey = true,
                   IssuerSigningKey = new SymmetricSecurityKey(key),
                   ValidateIssuer = false,
                   ValidateAudience = false,
                   ValidateLifetime = true,
                   RequireAudience = false
               };
           });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins(new string[] { "http://localhost:3000", "http://localhost:3001" });
                });
            });

            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IRoomRepository, RoomRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IPaymentRepository, PaymentRepository>();
            services.AddScoped<IDiscountRepository, DiscountRepository>();
            services.AddScoped<ICustomerRepository, CustomerRepository>();
            services.AddScoped<IRoomVariantRepository, RoomVariantRepository>();
            services.AddScoped<IRoomPricingRepository, RoomPricingRepository>();
            services.AddScoped<IProductCategoryRepository, ProductCategoryRepository>();
            services.AddScoped<IReservationTypeRepository, ReservationTypeRepository>();
            services.AddScoped<IReservationHeaderRepository, ReservationHeaderRepository>();
            services.AddScoped<IReservationPaymentRepository, ReservationPaymentRepository>();
            services.AddScoped<IReservationRoomLineRepository, ReservationRoomLineRepository>();

            services.AddAutoMapper(typeof(resortProfile));


            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<resortDbContext>();
                context.Database.Migrate();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors("CorsPolicy");
            app.UseAuthorization();
            app.UseAuthentication();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
