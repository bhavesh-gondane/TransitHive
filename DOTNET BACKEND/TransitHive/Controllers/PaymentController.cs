namespace TransitHive.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using TransitHive.Interfaces;
    using TransitHive.Models;
    using System.Threading.Tasks;
    using System.Collections.Generic;
    using TransitHive.Interfaces.Services;

    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payment1>>> GetPayments()
        {
            var payments = await _paymentService.GetAllPayments();
            return Ok(payments);
        }

        [HttpGet("user/{userid}")]
        public async Task<ActionResult<IEnumerable<Payment1>>> GetPaymentByUserId(int userid)
        {
            var payments = await _paymentService.GetPaymentByUserId(userid);
            return Ok(payments);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Payment>> GetPayment(int id)
        {
            var payment = await _paymentService.GetPayment(id);
            if (payment == null)
            {
                return NotFound();
            }
            return Ok(payment);
        }

        [HttpPost]
        public async Task<ActionResult> AddPayment(Payment1 payment)
        {
            if (payment.UserId <= 0)
            {
                return BadRequest("Valid UserId is required.");
            }
            await _paymentService.ProcessPayment(payment);
            return CreatedAtAction(nameof(GetPayment), new { id = payment.Id }, payment);
        }
    }
}