using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using hark_ett.Data;
using hark_ett.Models;

namespace hark_ett.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnergyRecordsController : ControllerBase
    {
        private readonly MyDBContext _context;

        public EnergyRecordsController(MyDBContext context)
        {
            _context = context;
        }

        // GET: api/EnergyRecords
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EnergyRecord>>> GetEnergyRecords()
        {
          if (_context.EnergyRecords == null)
          {
              return NotFound();
          }
            return await _context.EnergyRecords.ToListAsync();
        }

        // GET: api/EnergyRecords/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EnergyRecord>> GetEnergyRecord(int id)
        {
          if (_context.EnergyRecords == null)
          {
              return NotFound();
          }
            var energyRecord = await _context.EnergyRecords.FindAsync(id);

            if (energyRecord == null)
            {
                return NotFound();
            }

            return energyRecord;
        }

        // PUT: api/EnergyRecords/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEnergyRecord(int id, EnergyRecord energyRecord)
        {
            if (id != energyRecord.Id)
            {
                return BadRequest();
            }

            _context.Entry(energyRecord).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EnergyRecordExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/EnergyRecords
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EnergyRecord>> PostEnergyRecord(EnergyRecord energyRecord)
        {
          if (_context.EnergyRecords == null)
          {
              return Problem("Entity set 'MyDBContext.EnergyRecords'  is null.");
          }
            _context.EnergyRecords.Add(energyRecord);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEnergyRecord", new { id = energyRecord.Id }, energyRecord);
        }

        // DELETE: api/EnergyRecords/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEnergyRecord(int id)
        {
            if (_context.EnergyRecords == null)
            {
                return NotFound();
            }
            var energyRecord = await _context.EnergyRecords.FindAsync(id);
            if (energyRecord == null)
            {
                return NotFound();
            }

            _context.EnergyRecords.Remove(energyRecord);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EnergyRecordExists(int id)
        {
            return (_context.EnergyRecords?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
