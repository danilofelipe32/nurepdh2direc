import React, { useState } from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, AreaChart, Area, Legend, Sector, Rectangle
} from 'recharts';
import { ChartConfig } from '../types';
import { COLORS } from '../data';
import { Info } from 'lucide-react';

interface ChartGroupProps {
    charts: ChartConfig[];
}

// --- Custom Components ---

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-950/90 backdrop-blur-md border border-slate-700/50 p-3 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] z-50 min-w-[120px]">
                <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-1">{label ? label : payload[0].name}</p>
                <div className="flex items-center gap-3">
                    <div className="w-1 h-8 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]" style={{ backgroundColor: payload[0].color }}></div>
                    <div>
                        <p className="text-white text-xl font-bold leading-none drop-shadow-md">
                            {payload[0].value}%
                        </p>
                        <p className="text-slate-500 text-[10px] mt-0.5">do total</p>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 px-2">
            {payload.map((entry: any, index: number) => (
                <li key={`item-${index}`} className="flex items-center gap-1.5 min-w-fit">
                    <span 
                        className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" 
                        style={{ backgroundColor: entry.color, color: entry.color }}
                    ></span>
                    <span className="dark:text-slate-300 text-slate-600 text-[11px] font-medium whitespace-nowrap">{entry.value}</span>
                </li>
            ))}
        </ul>
    );
};

// --- Shape Renderers for Interactions ---

const renderActiveShapePie = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          className="filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300"
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 8}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
      </g>
    );
};

const CustomActiveBar = (props: any) => {
    const { fill, x, y, width, height } = props;
    return (
        <Rectangle
            {...props}
            fill={fill}
            stroke="#fff"
            strokeWidth={2}
            strokeOpacity={0.5}
            width={width + 2}
            height={height + 2}
            x={x - 1}
            y={y - 1}
            className="filter drop-shadow-lg transition-all duration-300"
        />
    );
};

// --- SVG Definitions for Area Gradients Only ---
const ChartDefs = ({ chartId }: { chartId: string }) => (
    <defs>
        {Object.values(COLORS).map((color, index) => {
            const colorId = color.replace('#', '');
            const suffix = `${chartId}-${colorId}`; 
            
            return (
                <linearGradient key={index} id={`grad-area-${suffix}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.5} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.05} />
                </linearGradient>
            );
        })}
    </defs>
);

// --- Chart Card Component ---
const ChartCard: React.FC<{ chart: ChartConfig }> = ({ chart }) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const isColumnChart = chart.layout === 'vertical';

    // Determina a cor base do card para detalhes sutis de UI
    const baseColor = chart.type === 'pie' ? COLORS.orange : chart.type === 'bar' ? COLORS.blue : COLORS.red;

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    // Prepare payload for Legend if it's a Bar chart (to match Pie chart style)
    const customBarPayload = chart.type === 'bar' ? chart.data.map((entry, index) => ({
        value: entry.name,
        color: entry.fill || Object.values(COLORS)[index % Object.values(COLORS).length],
        type: 'square',
        id: entry.name
    })) : [];

    return (
        <div className="dark:bg-slate-900/60 bg-white/60 backdrop-blur-xl rounded-2xl p-5 border dark:border-white/5 border-slate-200 shadow-xl hover:shadow-2xl dark:hover:bg-slate-900/70 hover:bg-white/80 transition-all duration-500 group flex flex-col h-[32rem] relative overflow-hidden">
            
            {/* Header */}
            <div className="flex items-start gap-3 mb-4 relative z-10 shrink-0">
                <div 
                    className="w-1 h-8 rounded-r-lg mt-1 shadow-[0_0_10px_currentColor]"
                    style={{ backgroundColor: baseColor, color: baseColor }}
                ></div>
                <h4 className="dark:text-slate-100 text-slate-800 font-semibold text-lg leading-tight tracking-tight drop-shadow-sm">
                    {chart.title}
                </h4>
            </div>

            {/* Chart Area */}
            <div className="flex-grow w-full relative z-10 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    {chart.type === 'bar' ? (
                        <BarChart 
                            data={chart.data} 
                            layout={isColumnChart ? 'horizontal' : 'vertical'}
                            margin={{ top: 0, right: 10, left: isColumnChart ? 0 : 0, bottom: 0 }}
                            onMouseMove={(state) => {
                                if (state.isTooltipActive) {
                                    setActiveIndex(state.activeTooltipIndex || 0);
                                } else {
                                    setActiveIndex(-1);
                                }
                            }}
                            onMouseLeave={() => setActiveIndex(-1)}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" horizontal={isColumnChart} vertical={!isColumnChart} />
                            
                            {isColumnChart ? (
                                <>
                                    <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} tickLine={false} axisLine={false} dy={10} />
                                    <YAxis hide />
                                </>
                            ) : (
                                <>
                                    <XAxis type="number" hide />
                                    <YAxis 
                                        dataKey="name" 
                                        type="category" 
                                        width={95}
                                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }} 
                                        tickLine={false} 
                                        axisLine={false} 
                                    />
                                </>
                            )}

                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                            <Legend payload={customBarPayload} content={<CustomLegend />} verticalAlign="bottom" height={60} />
                            
                            <Bar 
                                dataKey="value" 
                                radius={isColumnChart ? [6, 6, 6, 6] : [0, 6, 6, 0]} 
                                barSize={isColumnChart ? 32 : 18}
                                background={{ fill: 'currentColor', radius: 6, className: "text-slate-100 dark:text-white/5" }}
                                activeBar={<CustomActiveBar />}
                            >
                                {chart.data.map((entry, index) => {
                                    // Robust color selection fallback
                                    const color = entry.fill || Object.values(COLORS)[index % Object.values(COLORS).length];
                                    
                                    return (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={color}
                                            style={{ filter: `drop-shadow(0 0 2px ${color}40)` }}
                                        />
                                    );
                                })}
                            </Bar>
                        </BarChart>

                    ) : chart.type === 'pie' ? (
                        <PieChart>
                            <Pie
                                activeIndex={activeIndex}
                                activeShape={renderActiveShapePie}
                                data={chart.data}
                                cx="50%"
                                cy="45%"
                                innerRadius={65}
                                outerRadius={85}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                                cornerRadius={6}
                                onMouseEnter={onPieEnter}
                                onMouseLeave={() => setActiveIndex(-1)}
                            >
                                {chart.data.map((entry, index) => {
                                    const color = entry.fill || Object.values(COLORS)[index % Object.values(COLORS).length];
                                    return (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={color} 
                                            style={{ filter: `drop-shadow(0 0 6px ${color}50)` }}
                                            stroke="rgba(0,0,0,0.1)"
                                        />
                                    );
                                })}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend content={<CustomLegend />} verticalAlign="bottom" height={60} />
                        </PieChart>

                    ) : (
                        <AreaChart data={chart.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <ChartDefs chartId={chart.id} />
                            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" vertical={false} />
                            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} dy={10} />
                            <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'currentColor', strokeWidth: 1, strokeDasharray: '4 4', className: "text-slate-300 dark:text-white/20" }} />
                            <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke={COLORS.red} 
                                strokeWidth={3} 
                                fill={`url(#grad-area-${chart.id}-${COLORS.red.replace('#', '')})`}
                                dot={{ r: 4, fill: '#0f172a', stroke: COLORS.red, strokeWidth: 2 }} 
                                activeDot={{ r: 8, fill: COLORS.red, stroke: '#fff', strokeWidth: 3, filter: `drop-shadow(0 0 10px ${COLORS.red})` }}
                            />
                        </AreaChart>
                    )}
                </ResponsiveContainer>
            </div>

            {/* Summary Legend */}
            {chart.summary && (
                <div className="relative z-10 mt-2 pt-3 border-t dark:border-white/5 border-slate-200 shrink-0">
                    <div className="flex gap-2">
                        <Info className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                            <span className="font-medium text-slate-700 dark:text-slate-300 mr-1">Resumo:</span>
                            {chart.summary}
                        </p>
                    </div>
                </div>
            )}
            
            {/* Ambient Corner Glow Effect */}
            <div 
                className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-[60px] pointer-events-none opacity-10 dark:opacity-20 transition-opacity group-hover:opacity-20 dark:group-hover:opacity-30"
                style={{ backgroundColor: baseColor }}
            ></div>
            <div 
                className="absolute -bottom-12 -left-12 w-40 h-40 bg-white rounded-full blur-[80px] pointer-events-none opacity-0 dark:opacity-5 transition-opacity dark:group-hover:opacity-10"
            ></div>
        </div>
    );
};

export const ChartGroup: React.FC<ChartGroupProps> = ({ charts }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {charts.map(chart => (
                <ChartCard key={chart.id} chart={chart} />
            ))}
        </div>
    );
};