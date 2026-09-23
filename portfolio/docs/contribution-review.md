# Cortana’s curated career story

Reviewed 2026-09-24. Vivek’s personal account controls the public narrative. This is a focused review of selected public pull requests, not an exhaustive audit of his employment or all three repositories.

## Source priority

Use the new account of the Juspay internship, full-time productivity/reliability work, and subsequent mobility work. The onboarding result is **two weeks to one week**; older résumé wording is superseded. Keep explanations short and reveal project details only when asked. Do not infer sole ownership from PR authorship, counts, or repository membership.

The résumé PDF is unchanged and still available on request. Its old onboarding metric differs from the corrected conversational profile. Other résumé metrics should not be reintroduced into Cortana’s answers. Vivek subsequently authorized Asha Health details from the résumé. Asha is included in the career overview; specific questions can expand into clinic-operations agents, Pipecat voice automation, revenue analytics, and observability. Keep the ReAct and Pipecat initiatives distinct.

## Selected evidence

All PRs below were authored by `max-keviv`; merge state was checked through GitHub’s API. Selected file diffs were inspected, rather than relying only on generated PR summaries.

| Area | Evidence | Scope established |
| --- | --- | --- |
| Rental/intercity | [#8187](https://github.com/nammayatri/nammayatri/pull/8187), merged | Customer OTP flow changes across rental screen, home screen, driver information, and ride tracking. |
| Parcel delivery | [#8707](https://github.com/nammayatri/nammayatri/pull/8707), merged; [#9584](https://github.com/nammayatri/nammayatri/pull/9584), merged | Parcel delivery flow contribution; follow-up customer driver-offer waiting flow fix. |
| Ticketing/refunds | [#6789](https://github.com/nammayatri/nammayatri/pull/6789), merged | Ticket cancellation/service cancellation and booking detail APIs, access controls and storage changes. |
| Bus tracking | [#9880](https://github.com/nammayatri/nammayatri/pull/9880), merged | Android location update service, messaging, and driver flow/controller changes. |
| Dashboard ticketing | [#12400](https://github.com/nammayatri/nammayatri/pull/12400), merged | Booking, places/services, booking status/list APIs and cash collection with access controls. This does not establish ownership of the open data dashboard. |
| Boat fleet/ticketing | [#11940](https://github.com/nammayatri/nammayatri/pull/11940), merged | Fleet association, ticket sub-places, booking assignment and verification changes. Await clarification of “boarding” versus “boating” before adding this chapter to the spoken profile. |

Some other reviewed PRs, such as #9766 and #10338, were closed without a merge recorded. They are not cited as shipped work. Counts include release and duplicate PRs and are not an impact metric.

## Gaps

- Google Maps metro integration from scratch, onboarding impact, productivity/reliability work, backend protocols, open data dashboard and bus ticketing are based on Vivek’s account. This review did not independently establish all of their implementation details.
- `https://github.com/nammayatri/ops-dashboard` and `https://github.com/nammayatri/ny-react-native` returned 404 through unauthenticated GitHub API requests. They may be private, renamed, or unavailable; no code from them was reviewed.
- Do not transfer unrelated repository functionality or metrics to Vivek’s biography.
