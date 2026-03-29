import { CODING_QUESTIONS, LANGUAGES } from "@/constants";
import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertCircleIcon, BookIcon, LightbulbIcon, LaptopIcon } from "lucide-react";
import Editor from "@monaco-editor/react";
import { cn } from "@/lib/utils";
import useIsMobile from "@/hooks/useIsMobile";

function CodeEditor() {
  const [selectedQuestion, setSelectedQuestion] = useState(CODING_QUESTIONS[0]);
  const [language, setLanguage] = useState<"javascript" | "python" | "java">(LANGUAGES[0].id);
  const [code, setCode] = useState(selectedQuestion.starterCode[language]);
  const isMobile = useIsMobile();

  const handleQuestionChange = (questionId: string) => {
    const question = CODING_QUESTIONS.find((q) => q.id === questionId)!;
    setSelectedQuestion(question);
    setCode(question.starterCode[language]);
  };

  const handleLanguageChange = (newLanguage: "javascript" | "python" | "java") => {
    setLanguage(newLanguage);
    setCode(selectedQuestion.starterCode[newLanguage]);
  };

  return (
    <div className="h-full flex flex-col bg-card/50">
      {/* TOOLBAR */}
      <div className="h-14 border-b bg-background/50 backdrop-blur-md px-4 flex items-center justify-between gap-2 shrink-0 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/20">
            <LaptopIcon className="size-3.5 sm:size-4 text-primary" />
            <span className="text-xs sm:text-sm font-semibold tracking-tight whitespace-nowrap">Editor</span>
          </div>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <h2 className="text-xs sm:text-sm font-medium truncate max-w-[100px] sm:max-w-[200px] text-muted-foreground hidden xs:block">
            {selectedQuestion.title}
          </h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Select value={selectedQuestion.id} onValueChange={handleQuestionChange}>
            <SelectTrigger className="h-8 sm:h-9 w-[120px] sm:w-[180px] bg-background/50 border-border/50 text-xs sm:text-sm">
              <SelectValue placeholder="Question" />
            </SelectTrigger>
            <SelectContent className="bg-background/95 backdrop-blur-lg border-border/50">
              {CODING_QUESTIONS.map((q) => (
                <SelectItem key={q.id} value={q.id} className="text-xs sm:text-sm">
                  {q.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="h-8 sm:h-9 w-[100px] sm:w-[140px] bg-background/50 border-border/50 text-xs sm:text-sm">
              <SelectValue>
                <div className="flex items-center gap-2">
                  <img
                    src={`/${language}.png`}
                    alt={language}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain"
                  />
                  <span className="truncate">{LANGUAGES.find((l) => l.id === language)?.name}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-background/95 backdrop-blur-lg border-border/50">
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.id} value={lang.id} className="text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <img
                      src={`/${lang.id}.png`}
                      alt={lang.name}
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain"
                    />
                    {lang.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction={isMobile ? "vertical" : "horizontal"}>
          {/* PROBLEM SIDEBAR */}
          <ResizablePanel defaultSize={isMobile ? 40 : 35} minSize={25} maxSize={isMobile ? 70 : 50}>
            <ScrollArea className="h-full bg-muted/5">
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                    {selectedQuestion.title}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                      Easy
                    </span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">15 mins</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* PROBLEM DESC */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary">
                      <BookIcon className="size-3.5 sm:size-4" />
                      <h3 className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider">Description</h3>
                    </div>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-xs sm:text-sm">
                      <p className="whitespace-pre-line">{selectedQuestion.description}</p>
                    </div>
                  </div>

                  {/* EXAMPLES */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-yellow-500 pt-2 sm:pt-4">
                      <LightbulbIcon className="size-3.5 sm:size-4" />
                      <h3 className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider">Examples</h3>
                    </div>
                    {selectedQuestion.examples.map((example, index) => (
                      <div key={index} className="rounded-lg sm:rounded-xl border bg-muted/30 overflow-hidden">
                        <div className="px-3 py-1 sm:py-1.5 border-b bg-muted/50 text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase">
                          Example {index + 1}
                        </div>
                        <div className="p-3 font-mono text-[10px] sm:text-xs space-y-2">
                          <div className="flex gap-2">
                            <span className="text-primary font-bold shrink-0">Input:</span>
                            <span className="text-foreground/80 break-all">{example.input}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-primary font-bold shrink-0">Output:</span>
                            <span className="text-foreground/80 break-all">{example.output}</span>
                          </div>
                          {example.explanation && (
                            <div className="text-muted-foreground italic border-t border-border/30 pt-2 mt-2">
                              {example.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CONSTRAINTS */}
                  {selectedQuestion.constraints && (
                    <div className="space-y-2 pt-2 sm:pt-4">
                      <div className="flex items-center gap-2 text-blue-500">
                        <AlertCircleIcon className="size-3.5 sm:size-4" />
                        <h3 className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider">Constraints</h3>
                      </div>
                      <ul className="space-y-1.5">
                        {selectedQuestion.constraints.map((constraint, index) => (
                          <li key={index} className="flex items-start gap-2 text-[10px] sm:text-xs text-muted-foreground">
                            <span className="mt-1.5 size-1 rounded-full bg-muted-foreground/30 shrink-0" />
                            {constraint}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <ScrollBar />
            </ScrollArea>
          </ResizablePanel>

          <ResizableHandle withHandle className={cn(
            isMobile ? "h-1.5 sm:h-2" : "w-1.5 sm:w-2",
            "bg-border/50 hover:bg-primary/20 transition-colors"
          )} />

          {/* EDITOR AREA */}
          <ResizablePanel defaultSize={isMobile ? 60 : 65}>
            <div className="h-full flex flex-col">
              <div className="flex-1 relative">
                <Editor
                  height={"100%"}
                  defaultLanguage={language}
                  language={language}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: isMobile ? 12 : 14,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16, bottom: 16 },
                    wordWrap: "on",
                    wrappingIndent: "indent",
                    fontFamily: "var(--font-mono)",
                    glyphMargin: !isMobile,
                    lineHeight: 1.6,
                    cursorSmoothCaretAnimation: "on",
                  }}
                />
              </div>
              
              {/* STATUS BAR */}
              <div className="h-8 border-t bg-muted/30 px-4 flex items-center justify-between text-[9px] sm:text-[10px] text-muted-foreground uppercase font-medium shrink-0">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span>Lines: {code.split("\n").length}</span>
                  <span className="hidden xs:inline">Chars: {code.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="hidden xs:inline">Ready to collaborate</span>
                  <span className="xs:hidden">Live</span>
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
export default CodeEditor;