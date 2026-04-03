# Production Readiness Checklist

<!-- Present for sign-off before go-live. One-time gate at the entry to Operations.
     See PRODUCT_DEVELOPMENT_METHODOLOGY.md Stage 6. -->

**Sign-off date:**
**Signed off by:**

## Monitoring and Alerting
- [ ] Key signals defined (errors, latency, resource usage)
- [ ] Alerts configured — team will know something is wrong before users do
- [ ] Baseline "healthy" measurements established

## Runbook
- [ ] Runbook exists at `06-operations/runbook.md`
- [ ] Someone unfamiliar with the system can operate, restart, or recover it without tribal knowledge

## Rollback Plan
- [ ] A known, tested path exists to restore the prior state if a deployment causes harm
- [ ] Rollback procedure is documented in the runbook

## Operational Ownership
- [ ] Named owner responsible for the system in production: **_____________**
- [ ] Owner is aware and has accepted responsibility
