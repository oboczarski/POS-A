/**
 * Custom React hook for rendering Chart.js charts without react-chartjs-2.
 * Creates, updates, and cleans up Chart instances using native Canvas API.
 *
 * @module useChart
 */
import { useRef, useEffect, useCallback } from 'react';
import { Chart } from 'chart.js/auto';

/**
 * @param {object} params
 * @param {string} params.type - Chart type: 'line', 'bar', 'radar', etc.
 * @param {object} params.data - Chart.js data config (labels + datasets)
 * @param {object} params.options - Chart.js options
 * @param {object[]} [params.plugins] - Inline Chart.js plugins
 * @returns {{ canvasRef: React.RefObject<HTMLCanvasElement> }}
 */
export default function useChart({ type, data, options, plugins = [] }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  // Stable serialisation key for data/options — drives updates
  const dataKey = JSON.stringify(data);
  const optsKey = JSON.stringify(options, (_k, v) =>
    typeof v === 'function' ? v.toString() : v
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Destroy previous instance
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    // Resolve function-based backgroundColor / borderColor etc.
    // (Chart.js handles this natively — no need to pre-resolve)
    try {
      chartRef.current = new Chart(canvas, {
        type,
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          ...options,
        },
        plugins,
      });
    } catch (err) {
      console.error('[useChart] Failed to create chart:', err);
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
    // We intentionally re-create the chart when data or options change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, dataKey, optsKey]);

  return { canvasRef, chartInstance: chartRef };
}
