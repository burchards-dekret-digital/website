<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:tei="http://www.tei-c.org/ns/1.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs" version="2.0">
    <xsl:output method="html" indent="yes" encoding="UTF-8" omit-xml-declaration="yes"/>
    <xsl:strip-space elements="*"/>

    <!-- Load scribes + literature for scribe/source lookup -->
    <xsl:variable name="scribesDoc" select="doc('../register/scribes.xml')" as="document-node()"/>
    <xsl:variable name="literatureDoc" select="doc('../register/literature.xml')" as="document-node()"/>

    <!-- Keys -->
    <xsl:key name="handNotesById" match="tei:handNote" use="@xml:id"/>
    <xsl:key name="allHandRefs" match="*[@hand] | tei:handShift[@new]" use="(@hand | @new)"/>
    <xsl:key name="personById" match="tei:person" use="@xml:id"/>
    <xsl:key name="biblById" match="tei:biblStruct" use="@xml:id"/>

    <!-- Root: build accordion with two sections -->
    <xsl:template match="/">
        <div class="accordion accordion-flush" id="accordionScribe">
            <xsl:variable name="ms-id" select="/tei:TEI/@xml:id"/>
            <xsl:variable name="book-n" select="//tei:div[@type='book']/@n"/>

            <!-- Scribe Info -->
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingScribe">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseScribe-{$ms-id}-{$book-n}" aria-expanded="false" aria-controls="collapseScribe-{$ms-id}-{$book-n}">
                        <span lang="de">Schreiber</span><span lang="en">Scribe</span>
                    </button>
                </h2>
                <div id="collapseScribe-{$ms-id}-{$book-n}" class="accordion-collapse collapse" aria-labelledby="headingScribe">
                    <div class="accordion-body">
                        <xsl:for-each select="(//*[@hand] | //tei:handShift[@new])                                     [generate-id() = generate-id(key('allHandRefs', (@hand | @new))[1])]">
                            <xsl:variable name="handId" select="substring-after((@hand | @new)[1], '#')"/>
                            <xsl:apply-templates select="key('handNotesById', $handId)"/>
                        </xsl:for-each>
                    </div>
                </div>
            </div>

            <!-- List of Hands in Manuscript -->
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingHands">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseHands-{$ms-id}-{$book-n}" aria-expanded="false" aria-controls="collapseHands-{$ms-id}-{$book-n}">
                        <span lang="de">Auflistung beteiligte Hände</span>
                        <span lang="en">List of hands involved</span>
                    </button>
                </h2>
                <div id="collapseHands-{$ms-id}-{$book-n}" class="accordion-collapse collapse" aria-labelledby="headingHands">
                    <div class="accordion-body">
                        <div class="dropdown dropdown-structure">
                            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButtonHands" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-plus-minus"/>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButtonHands">
                                <p class="ms-3" style="font-weight: bold;">
                                    <span lang="de">Spalten ein-/ausblenden</span>
                                    <span lang="en">Show/hide columns</span>
                                </p>
                                <li>
                                    <label class="dropdown-item">
                                        <input type="checkbox" class="form-check-input toggle-column" data-column="0" checked="true"/> 
                                        <span lang="de">Hand</span> <span lang="en">Hand</span>
                                    </label>
                                </li>
                                <li>
                                    <label class="dropdown-item">
                                        <input type="checkbox" class="form-check-input toggle-column" data-column="1" checked="true"/> 
                                        <span lang="de">Schreiber</span> <span lang="en">Scribe</span>
                                    </label>
                                </li>
                                <li>
                                    <label class="dropdown-item">
                                        <input type="checkbox" class="form-check-input toggle-column" data-column="2" checked="true"/> 
                                        <span lang="de">Quelle</span> <span lang="en">Source</span>
                                    </label>
                                </li>
                            </ul>
                        </div>

                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th><span lang="de">Hand</span><span lang="en">Hand</span></th>
                                        <th><span lang="de">Schreiber</span><span lang="en">Scribe</span></th>
                                        <th><span lang="de">Quelle</span><span lang="en">Source</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <xsl:for-each select="//tei:handDesc/tei:handNote">
                                        <tr>
                                            <!-- Hand -->
                                            <td><xsl:apply-templates select="node() except tei:note"/></td>

                                            <!-- Scribe -->
                                            <td>
                                                <xsl:variable name="scribeId" select="substring-after(@scribeRef, '#')"/>
                                                <xsl:variable name="scribe" select="key('personById', $scribeId, $scribesDoc)"/>
                                                <xsl:if test="$scribe">
                                                    <xsl:value-of select="concat($scribe/tei:name, ', ', $scribe/tei:affiliation)"/>
                                                </xsl:if>
                                            </td>

                                            <!-- Source -->
                                            <td>
                                                <xsl:variable name="sourceId" select="substring-before(substring-after(@source, '#'), '|')"/>
                                                <xsl:variable name="pageNumber" select="substring-after(@source, '|')"/>
                                                <xsl:variable name="bibl" select="key('biblById', $sourceId, $literatureDoc)"/>
                                              
                                                <xsl:if test="$bibl">
                                                  <!-- Book info -->
                                                  <xsl:value-of select="$bibl/tei:monogr/tei:title"/>
                                                  <xsl:text>, </xsl:text>
                                                  <xsl:for-each select="$bibl/tei:monogr/tei:author">
                                                    <xsl:value-of select="concat(tei:forename, ' ', tei:surname)"/>
                                                    <xsl:if test="position() != last()">; </xsl:if>
                                                  </xsl:for-each>
                                                  <xsl:text>, </xsl:text>
                                                  <xsl:value-of select="$bibl/tei:monogr/tei:imprint/tei:pubPlace"/>
                                                  <xsl:text>, </xsl:text>
                                                  <xsl:value-of select="$bibl/tei:monogr/tei:imprint/tei:date"/>
                                                  <xsl:if test="$bibl/tei:series">
                                                    <xsl:text>, </xsl:text>
                                                    <xsl:value-of select="$bibl/tei:series/tei:title"/>
                                                    <xsl:text>, </xsl:text>
                                                    <xsl:value-of select="$bibl/tei:series/tei:biblScope[@unit = 'volume']"/>
                                                  </xsl:if>
                                                  <xsl:text>, Page: </xsl:text>
                                                  <xsl:value-of select="$pageNumber"/>
                                              
                                                  <!--  Add external link icon -->
                                                  <xsl:text> </xsl:text>
                                                  <a>
                                                    <xsl:attribute name="href">
                                                      <xsl:value-of select="concat('bibl.html#', $sourceId)"/>
                                                    </xsl:attribute>
                                                    <xsl:attribute name="target">_blank</xsl:attribute>
                                                    <i class="fas fa-arrow-up-right-from-square fa-sm"/>
                                                  </a>
                                                </xsl:if>
                                              </td>

                                        </tr>
                                    </xsl:for-each>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </xsl:template>

    <!-- handNote template for the Scribe Info accordion -->
    <xsl:template match="tei:handNote">
        <xsl:variable name="scribeNumber" select="substring-after(@scribeRef, 'WoSscribe')"/>
        <xsl:choose>
            <xsl:when test="contains(@scribeRef, 'WoSscribe')">
                <p class="scribe{$scribeNumber}-info">
                    <xsl:value-of select="normalize-space(./text())"/>
                    <xsl:text> </xsl:text>
                    <span lang="de">Schreiber</span>
                    <xsl:text> </xsl:text>
                    <span lang="en">Scribe</span>
                    <xsl:text> </xsl:text>
                    <xsl:value-of select="$scribeNumber"/>
                    <xsl:text>, Wormser Scriptorium</xsl:text>
                </p>
            </xsl:when>
            <xsl:when test="contains(@scribeRef, 'WoSunidentified')">
                <p class="scribe-unidentified-info">
                    <span lang="de">Nicht identifizierte Hand.</span>
                    <xsl:text> </xsl:text>
                    <span lang="en">Not identified hand.</span>
                </p>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
</xsl:stylesheet>