using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using TransitHive.Dtos;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace TransitHive.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CheckoutController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CheckoutController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("create-checkout-session")]
        public IActionResult CreateCheckoutSession([FromBody] BookingDto bookingDTO)
        {

            int bookingId = bookingDTO.Id; 
            try
            {
                if (bookingDTO == null)
                {
                    Console.WriteLine("Received null BookingDto");
                    return BadRequest(new { error = "Invalid booking data." });
                }

                Console.WriteLine($"Booking received: {JsonConvert.SerializeObject(bookingDTO)}");


                StripeConfiguration.ApiKey = _configuration["Stripe:SecretKey"]; // Set API key

                var options = new SessionCreateOptions
                {
                    PaymentMethodTypes = new List<string>
                    {
                        "card",
                    },
                    LineItems = new List<SessionLineItemOptions>
                    {
                        new SessionLineItemOptions
                        {
                            PriceData = new SessionLineItemPriceDataOptions
                            {
                                Currency = "inr",
                                UnitAmount = (long)(bookingDTO.Cost * 100), // Stripe uses smallest currency unit
                                ProductData = new SessionLineItemPriceDataProductDataOptions
                                {
                                    Name = "Booking Payment",
                                },
                            },
                            Quantity = 1,
                        },
                    },
                    Mode = "payment",
                    SuccessUrl = $"http://localhost:5173/success?session_id={{CHECKOUT_SESSION_ID}}&booking_id={bookingId}"

                };

                var service = new SessionService();
                var session = service.Create(options);

                return Ok(new { sessionId = session.Id });
            }
            catch (StripeException ex)
            {
                Console.WriteLine($"Stripe error: {ex.Message}");
                return BadRequest(new { error = ex.Message });
            }
        }

        //[HttpGet("verify-payment")]
        //public IActionResult VerifyPayment([FromQuery] string sessionId)
        //{
        //    try
        //    {
        //        Console.WriteLine($"Session ID: {sessionId}");
        //        // Set your Stripe secret key. You can use environment variables to store it securely.
        //        StripeConfiguration.ApiKey = _configuration["Stripe:SecretKey"];

        //        // Retrieve the session from Stripe using the sessionId
        //        var service = new SessionService();
        //        var session = service.Get(sessionId);

        //        // Optionally, check the session status to confirm payment success
        //        if (session.PaymentStatus == "paid")
        //        {
        //            // Send back the transaction ID or any relevant data
        //            var response = new Dictionary<string, string>
        //            {
        //                { "transactionId", session.PaymentIntentId } // Or use other transaction ID
        //            };
        //            return Ok(response);
        //        }
        //        else
        //        {
        //            return BadRequest(new { error = "Payment failed" });
        //        }
        //    }
        //    catch (StripeException e)
        //    {
        //        return StatusCode(500, new { error = "Error retrieving payment" });
        //    }
        //    catch (Exception e)
        //    {
        //        return StatusCode(500, new { error = "An unexpected error occurred" });
        //    }
        //}

        [HttpGet("verify-payment")]
        public IActionResult VerifyPayment(string sessionId)
        {
            try
            {
                // Initialize Stripe
                StripeConfiguration.ApiKey = _configuration["Stripe:SecretKey"];

                // Retrieve session details
                var service = new SessionService();
                var session = service.Get(sessionId);

                if (session != null)
                {
                    // Optionally include additional details
                    return Ok(new
                    {
                        sessionId = session.Id,
                        amountTotal = session.AmountTotal,
                        currency = session.Currency,
                        paymentStatus = session.PaymentStatus,
                        transactionId = session.PaymentIntentId
                    });
                }
                else
                {
                    return NotFound(new { message = "Session not found." });
                }
            }
            catch (StripeException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

    }

}
