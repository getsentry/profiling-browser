export interface RawThreadCpuProfile {}
export interface ThreadCpuProfile {}

interface CpuProfilerBindings {
  startProfiling(name: string): void;
  stopProfiling(name: string): RawThreadCpuProfile | null;
}

const CpuProfilerBindings: CpuProfilerBindings = {
  startProfiling(name: string) {
    // @TODO
    return {};
  },
  stopProfiling(name: string) {
    // @TODO
    return {};
  }
};
export { CpuProfilerBindings };
