import { useMemo } from 'react'

function useSelectors(reducer, mapStateToSelectors) {
  const [state] = reducer
  const selectors = useMemo(() => mapStateToSelectors(state), [state])
  return selectors
}

function useActions(reducer, mapDispatchToActions) {
  const [dispatch] = reducer
  const actions = useMemo(() => mapDispatchToActions(dispatch), [dispatch])
  return actions
}

export {
  useSelectors,
  useActions
}