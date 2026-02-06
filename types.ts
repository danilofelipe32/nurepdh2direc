export interface ChartDataPoint {
    name: string;
    value: number;
    fill?: string;
}

export interface ChartConfig {
    id: string;
    title: string;
    type: 'bar' | 'pie' | 'line' | 'area';
    data: ChartDataPoint[];
    layout?: 'vertical' | 'horizontal'; // vertical = colunas, horizontal = barras laterais
    xAxisKey?: string; 
    barKey?: string; 
    lineKey?: string; 
    summary?: string; // Novo campo para o resumo/legenda
}

export interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    align: 'left' | 'right';
}

export interface MediaItem {
    id: string;
    type: 'image' | 'video';
    src: string;
    thumbnail?: string; // For videos
    alt?: string;
}

export interface DocumentItem {
    title: string;
    url: string;
}